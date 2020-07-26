import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
 
  
class Content extends Component {

    state = {
        countries: [],
        searchResults: [],
        searchKeyWord: '',
        country: '',
        isOpen: false
    };

    componentDidMount() {
        fetch('/api/country')
            .then(response => response.json())
            .then(data => this.setState({ countries: data, country: data[0].name }));
      
    }

    handleChange = (e) => this.setState({ searchKeyWord: e.target.value });

    fetchSearchResults = (e) => {
        var x = e.keyCode;
        if (x === 13 && e.target.value && this.state.country) {
           this.getData(this.state.country, e.target.value);
        }
        else {
            //show warning message
        }
    };

    getData = (country, searchKeyWord) => {
        fetch(`/api/search?value=${searchKeyWord}&country=${country}`)
        .then(response => response.json())
        .then(data => this.setState({ searchResults: data }));
    }

    onSelected = (item) => {
       this.setState({isOpen: true, content: item})
    }

    handleCountryChange =  (e) => {
        this.setState({country: e.target.value});
        if(this.state.searchKeyWord)
            this.getData(e.target.value, this.state.searchKeyWord);
    }

    closeModal = () => this.setState({isOpen: false})


    render() {
        return (
            <>

             <div className="row" style={{justifyContent: "center"}}>
                <div className="col-sm-3">
                <select className="form-control" onChange={this.handleCountryChange} value={this.state.country}>
                    {
                        this.state.countries.map(item =>
                            <option key={item.code}>{item.name}</option>)
                    }
                </select>
                </div>
                <div className="col-sm-3">
                <input className="form-control" onChange={this.handleChange} value={this.state.searchKeyWord} onKeyUp={this.fetchSearchResults} />

                    </div>



             </div>
                {this.state.searchResults.length > 0 ? <Table striped bordered hover style={{backgroundColor: '#fff'}}>
                    <thead>
                        <tr>
                            <th>
                                Search Results for {this.state.searchKeyWord}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.searchResults.map(item =>
                                <tr style={{cursor: "pointer"}} key={item.id} onClick={() => this.onSelected(item)}>
                                    <td>
                                        <h4>{item.name}</h4>
                                        <br />
                                        {item.address}
                                    </td>

                                </tr>)
                        }
                    </tbody>
                </Table> : null}
               {this.state.isOpen ?  <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Company Information"
        >
        <div><h4 style={{float: "left"}}>Company Information</h4>

<button class="cross" onClick={this.closeModal} style={{float: "right", marginRight: '20px'}}>X</button></div>
          <div style={{marginTop: '50px'}}>
          <div className="main-heading">{this.state.content.name}</div>
          <div>Company Status: {this.state.content.status}</div>
          <div className="main-heading">COMPANY REGISTRATION NUMBER</div>
          <div>{this.state.content.registrationNumber}</div>
          <div className="main-heading">VAT NUMBER</div>
          <div>{this.state.content.vatNumber}</div>
          <div className="main-heading">REGISTERED ADDRESS</div>
          <div>{this.state.content.address}</div>
          <div className="main-heading">COUNTRY</div>
          <div>{this.state.content.country}</div>
          <div className="main-heading">ADDITIONAL STATUS DETAILS</div>
          <div>{this.state.content.additionalStatusDetails}</div>
          <div className="main-heading">COMPANY DESCRIPTION</div>
          <div>{this.state.content.description}</div>
          </div>

       
        </Modal> : ''}
            </>
        );
    }
}

export default Content;
