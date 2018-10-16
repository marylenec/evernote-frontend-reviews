import React, { Component } from 'react'

class SearchBar extends Component {

  render() {
    return (
      <form className ="form-inline left">
        <div className="form-group mx-sm-3">
          <label htmlFor="search" className="sr-only">Search</label>
          <input className="form-control" type="text" id="current-search" placeholder="Search" onChange={(e) => this.props.handleSearchTerm(e.target.value)} />
        </div>
      </form>
    )
  }
}

export default SearchBar;
