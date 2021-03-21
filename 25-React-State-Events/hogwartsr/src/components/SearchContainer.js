import React, { Component } from 'react'

import Card from './Card'

class SearchContainer  extends Component {

    state = {
        wizards: [],
        searchText: ''
    }
    componentDidMount = async () => {
        const response = await fetch ('http://localhost:3002/wizards')
        const wizards = await response.json()

        this.setState({wizards: wizards})
    }

    changeSearch = (event) => {
        this.setState({
            searchText: event.target.value
        })
    }

    filteredWizards(){
        const filteredWizards = 
        this.state.wizards.filter(wizard => wizard.house.toLowerCase()
        .includes(this.state.searchText.toLowerCase()
        ))
        return filteredWizards
    }

    render() {
        return (
            <div className="container mt-5">
                <form>
                     <div className="form-group">
                       <label htmlFor="search-text">Search by House:</label>
                       <input onChange={this.changeSearch} type="text" className="form-control" id="search-text" placeholder="gryffindor sucks"/>
                    </div>
                </form>
                <div className="row justify-content-md-center">
                {this.filteredWizards().map(
                    wizard => <Card wizard={wizard} key={wizard.id}/>
                )}
                </div>
            </div>
        )
    }

    }

export default SearchContainer