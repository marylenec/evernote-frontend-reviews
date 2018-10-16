import React, { Component } from 'react'

  class ReviewCard extends Component {

    render() {
      const { review } = this.props
      return (
        <div className='ReviewCard' onClick={()=> this.props.handleSelectedReview(review.id)} >
          <h4 className='subtitle'>{review.title}<br/>{review.name}</h4>
          <div><small>Product ID:&nbsp;{review.product_id}&nbsp;|&nbsp;{review.brand}</small><br/>
          {review.reviewText.substring(0, 50)}...&nbsp;
          <br/>
          </div>
          <div className='rating mx-sm-3'>
          Rating: {review.rating}<br/>
          User: {review.user_id}<br/>
          ID: {review.id}
          </div>
          <div className='clearfix'></div>
          <hr/>
        </div>
      )
    }
  }

export default ReviewCard;
