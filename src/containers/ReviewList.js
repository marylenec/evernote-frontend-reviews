import React, { Component } from 'react'
import ReviewCard from '../components/ReviewCard';


  class ReviewList extends Component {


    displayReviews = () => {
        return this.props.reviews.map(review => {
        return <ReviewCard review={review} key={review.id} handleSelectedReview={this.props.handleSelectedReview} />
      })
    }

      render() {
      return (
        <div className='ReviewList'>
          <div className="new-section mx-sm-3">
            <button onClick={(e) => this.props.displayStatus(e, 'new')} className="btn btn-primary" >Add New Review</button>
          </div>
          <hr/>
          {this.displayReviews()}
        </div>
      )
    }
  }

export default ReviewList
