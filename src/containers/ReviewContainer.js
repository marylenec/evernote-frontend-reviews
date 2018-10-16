import React, { Component } from 'react';
import ReviewList from './ReviewList';
import LoginForm from '../components/LoginForm';
import NavBar from '../components/NavBar';
import ReviewDisplay from '../components/ReviewDisplay';
import SearchBar from '../components/SearchBar';

  class ReviewContainer extends Component {

    state = {
      reviews: [],
      username: "",
      password: "",
      currentUser: {},
      loginError: "",
      selectedReview: null,
      newReview: {},
      displayStatus: 'default',
      searchTerm: ""
    }

    componentDidMount() {
      this.fetchReviews()
      this.fetchUser()
    }

    fetchReviews = () => {
      fetch('http://localhost:3000/reviews')
      .then(res => res.json())
      .then(reviews => this.sortReviews(reviews))
    }

    sortReviews(reviews) {
      reviews = reviews.sort(function(a, b) {
  return a.id - b.id  ||  a.name.localeCompare(b.name);
});
      this.setState({
        reviews: reviews
      })
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleSubmit = (e) => {
      e.preventDefault();

      fetch('http://localhost:3000/login', {
        method: "POST",
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
          }),
        headers: {
          "Content-Type": "application/json"
        }
      })

      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          localStorage.token = data.token;
          this.setState({
            currentUser: data.user
          })
        } else {
          this.setState({
            loginError: data.error
          })
        }
      })
    }

    handleSearchTerm = (searchTerm) => {
      this.setState({
        searchTerm: searchTerm
      })
    }

    filteredReviews = () =>{
      return this.state.searchTerm !="" ? this.state.reviews.filter(review => {
        return review.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())}) : this.state.reviews
    }

    handleSelectedReview = (review) => {
      // console.log(`http://localhost:3000/reviews/${review}`)
      fetch(`http://localhost:3000/reviews/${review}`)
      .then(res => res.json())
      .then(review => this.setState({
        selectedReview: review,
        displayStatus: 'selected'
      }))
    }

    fetchUser = () => {
      const token = localStorage.token;

      if (this.state.currentUser) { fetch('http://localhost:3000/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          this.setState({
            currentUser: data
          });
        }
      })
      }

    }

    handleLogOut = (e) => {
      localStorage.token = "";
    }

    addReview = (e, review) => {
      e.preventDefault()
      const token = localStorage.token;
      console.log(token)

      if (this.state.currentUser.id) {
      fetch('http://localhost:3000/reviews/', {
        method: "POST",
        body: JSON.stringify(
            review
          ),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {this.fetchReviews()})
      .then(
        this.setState({
          displayStatus: 'default'
        },()=>console.log(this.state))
      )
    }
    else console.log("Not logged in")
    }

    displayStatus = (e, state) => {
      e.preventDefault();
      this.setState({
        displayStatus: state
      })
    }

    editReview = (e, review) => {
      e.preventDefault();
      const token = localStorage.token;

      fetch(`http://localhost:3000/reviews/${review.id}`, {
        method: "PATCH",
        body: JSON.stringify(
            review
          ),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {this.fetchReviews()})
      .then(
        this.setState({
          displayStatus: 'default'
        })
      )
    }

    deleteReview = (e, review) => {
      e.preventDefault();
      const token = localStorage.token;

      fetch(`http://localhost:3000/reviews/${review.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {this.fetchReviews()})
      .then(
        this.setState({
          displayStatus: 'default'
        })
      )
    }

    handleReviewChange = (e) => {
      if (this.state.currentUser.id) {
      let value = e.target.value
      let keyName = e.target.name
      this.setState(state => {
        state.selectedReview[keyName] = value
        return state
      })
    } else {
      console.log("Not logged in")
    }
    }

    handleNewReviewChange = (e) => {
      if (this.state.currentUser.id) {
      let value = e.target.value
      let keyName = e.target.name
      this.setState(state => {
        state.newReview[keyName] = value
        return state
      })
    } else {
      console.log("Not logged in")
    }
    }

    render() {
      return (
        <div>
        <NavBar />
          <div className="row">
            <div className="col-md-6">
            <SearchBar handleSearchTerm = {this.handleSearchTerm}/>
            </div>
            <div className="col-md-6">
              <LoginForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} currentUser={this.state.currentUser} handleLogOut={this.handleLogOut} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
            { this.filteredReviews ? <ReviewList
              reviews={this.filteredReviews()}
              handleSelectedReview={this.handleSelectedReview}
              displayStatus={this.displayStatus} /> : <p>Loading... </p>}
            </div>
            <div className="col-md-9">
            {this.state.currentUser.id ? <p>Welcome {this.state.currentUser.first_name}!</p>: null }
            {this.state.displayStatus ? <ReviewDisplay
              currentUser = {this.state.currentUser}
              addReview = {this.addReview}
              selectedReview={this.state.selectedReview}
              newReview={this.state.newReview}  displayState={this.state.displayStatus} displayStatus={this.displayStatus} editReview={this.editReview}
              deleteReview={this.deleteReview} handleReviewChange={this.handleReviewChange}
              handleNewReviewChange={this.handleNewReviewChange}
              editedReview={this.state.editedReview}/> : null }
            </div>
          </div>
        </div>
    )
  }
}

export default ReviewContainer;
