import React, { Component } from 'react'

  class ReviewDisplay extends Component {

    displayStatus = () => {
      if (this.props.displayState === 'new') {
        return (
        <form className='editForm' onSubmit={(e) => this.props.addReview(e, this.props.newReview)}>
        <h4 className='subtitle'>
        <input id="title" name="title" type="text" placeholder="Title" onChange={(e) => this.props.handleNewReviewChange(e)} /><br/>
        <input id="name" name="name" type="text" placeholder="Product Name" onChange={(e) => this.props.handleNewReviewChange(e)} /></h4>
        <div><small>Product ID:&nbsp;<input id="product_id" name="product_id" type="text" placeholder="Product ID" onChange={(e) => this.props.handleNewReviewChange(e)} /></small>
        <small>Product Brand:&nbsp;<input id="brand" name="brand" type="text" placeholder="Brand" onChange={(e) => this.props.handleNewReviewChange(e)} /> </small><br/>
        <input id="reviewText" name="reviewText" type="text"  placeholder="Review" onChange={(e) => this.props.handleNewReviewChange(e)} />
        <br/>
        </div>
        <div className='rating mx-sm-3'>
        Rating: <input id="rating" name="rating" type="text" placeholder="Rating" onChange={(e) => this.props.handleNewReviewChange(e)} /><br/>
        User: {this.props.currentUser.id}
        </div>
        <div className='clearfix'></div>
        <div className="form-group mx-sm-3">
          <button className="btn btn-primary" onClick={(e) => this.props.addReview(e, this.props.newReview)}>Save</button>
          <button className="btn btn-primary" onClick={(e) => this.props.displayStatus(e, 'default')}>Cancel</button>
        </div>
        <hr/>
        </form>
        )
      } if (this.props.displayState === 'edit') {
        return (<form className='editForm' onSubmit={(e) => this.props.editReview(e, this.props.selectedReview)}>
        <h4 className='subtitle'>
        <input id="title" name="title" type="text" value={this.props.selectedReview.title} onChange={(e) => this.props.handleReviewChange(e)} /><br/>
        <input id="name" name="name" type="text" value={this.props.selectedReview.name} onChange={(e) => this.props.handleReviewChange(e)} /></h4>
        <div><small>Product ID:&nbsp;<input id="product_id" name="product_id" type="text" value={this.props.selectedReview.product_id} onChange={(e) => this.props.handleReviewChange(e)} /></small>
        <small>Product Brand:&nbsp;<input id="brand" name="brand" type="text" value={this.props.selectedReview.brand} onChange={(e) => this.props.handleReviewChange(e)} /> </small><br/>
        <input id="reviewText" name="reviewText" type="text" value={this.props.selectedReview.reviewText} onChange={(e) => this.props.handleReviewChange(e)} />
        <br/>
        </div>
        <div className='rating mx-sm-3'>
        Rating: <input id="rating" name="rating" type="text" value={this.props.selectedReview.rating} onChange={(e) => this.props.handleReviewChange(e)} /><br/>
        User: {this.props.selectedReview.user_id}
        </div>
        <div className='clearfix'></div>
        <div className="form-group mx-sm-3">
          <button className="btn btn-primary" onClick={(e) => this.props.editReview(e, this.props.selectedReview)}>Save</button>
          <button className="btn btn-primary" onClick={(e) => this.props.deleteReview(e, this.props.selectedReview)}>Delete</button>
          <button className="btn btn-primary" onClick={(e) => this.props.displayStatus(e,'default')}>Cancel</button>
        </div>
        <hr/>
        </form>)
      } if (this.props.displayState === 'selected')  {
        return (<div className='ReviewCard'>
          <h4 className='subtitle'>{this.props.selectedReview.title}<br/>{this.props.selectedReview.name}</h4>
          <div><small>Product ID:&nbsp;{this.props.selectedReview.product_id}&nbsp;|&nbsp;{this.props.selectedReview.brand}</small><br/>
          {this.props.selectedReview.reviewText}<br/>
          </div>
          <div className='rating mx-sm-3'>
          Rating: {this.props.selectedReview.rating}<br/>
          User: {this.props.selectedReview.user_id}
          </div>
          <div className='clearfix'></div>
          <div className="form-group mx-sm-3">
            <button className="btn btn-primary" onClick={(e) => this.props.displayStatus(e,'edit')}>Edit</button>
          </div>
          <hr/>
        </div>)
      } if (this.props.displayState === 'default')  {
        return (
          <div className='ReviewCard'>
          <h4 className='subtitle'>Select a Review</h4>
        </div>)
      }
    }

      render() {
        return (
          <div>
            {this.displayStatus()}
          </div>
        )
      }
    }

export default ReviewDisplay;
