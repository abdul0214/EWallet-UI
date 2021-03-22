import React, { Component } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel, CSelect,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as All from '@fortawesome/free-solid-svg-icons'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import WalletService from '../../api/WalletService.js'

class WalletRegister extends Component {

    // Constructor
    constructor(props) {
        super(props);

        this.state = {
            id: '',

            currency:'',

          name: '',

            createdWallet:{
              name:'',
              currency: '',
              id:'',
              customer:'',
              created:''
            },
            model: '',
            description: '',
            manufacturer: ''
        };
    }


    // custom methods

    inputChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    resetInputHandler = () => {
        this.setState({
            currency: '',
            id: '',
            name: '',
        })
    }

    createWalletHandler = (event) => {
        event.preventDefault();

        let currency = this.state.currency
        let name = this.state.name


      if(!currency) {
            NotificationManager.warning("Incorrect Request Params");
        } else {
            WalletService.createWalletHandler(currency,name)
            .then(response => {
                if(response.status === 200) {
                    NotificationManager.success(`${this.state.name}  wallet is successfully created`, response.statusText)
                    this.setState({ createdWallet: response.data })
                  console.log(this.createdWallet)
                } else {
                    NotificationManager.warning("Please check the console for details", response.statusText)
                }
            })
            .catch(error => {
                let errorMessage;
                if (error.response) {
                    errorMessage = "Some unknown error occurred!";
                    this.setState({errorMessage: errorMessage})
                } else if (error.request) {
                    errorMessage = "The request was made but no response was received";
                    this.setState({errorMessage: errorMessage})
                    console.log(error.request);
                } else {
                    errorMessage = error.message;
                    this.setState({errorMessage: errorMessage})
                    console.log('Error', error.message);
                }
                NotificationManager.warning(errorMessage, 'OOPS...');
            })
        }
    }

    render() {
        return (
            <div>
            <CCard>
                <CCardHeader>Create New Wallet</CCardHeader>
                <CCardBody>
                    <CForm onSubmit={this.createWalletHandler} onReset={this.resetInputHandler} encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="name">Wallet Name</CLabel>
                            </CCol>
                            <CCol md="3">
                                <CInput type="text"
                                    value={this.state.name}
                                    onChange={this.inputChangeHandler}
                                    id="name"
                                    name="name"
                                    placeholder="Enter Wallet Name"
                                    autoComplete="name" />
                            </CCol>
                        </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="currency-input">Currency</CLabel>
                        </CCol>
                        <CCol md="3">
                          <CSelect custom name="currency" value={this.state.currency} onChange={this.inputChangeHandler} id="currency-input">
                            <option value="USDOLLAR_$">US Dollar $</option>
                            <option value="CANADIANDOLLAR_CA$">Canadian Dollar CA$</option>
                            <option value="AUSTRALIANDOLLAR_A$">Australian Dollar A$</option>
                            <option value="STERLINGPOUND_£">Sterling Pound £</option>
                            <option value="JAPANESEYEN_¥">Japanese Yen ¥</option>
                            <option value="SWISSFRANC_CHF">Swiss Franc CHF</option>
                            <option value="SWEDISHKORONA_SEK">Swedish Corona SEK</option>

                          </CSelect>
                        </CCol>
                      </CFormGroup>
                      {/*<CFormGroup row>*/}
                      {/*  <CCol md="3">*/}
                      {/*    <CLabel htmlFor="model-input">Customer Id</CLabel>*/}
                      {/*  </CCol>*/}
                      {/*  <CCol md="3">*/}
                      {/*    <CInput id="id" name="id" type="text" value={this.state.id} onChange={this.inputChangeHandler}  />*/}

                      {/*  </CCol>*/}
                      {/*</CFormGroup>*/}

                        <CCardFooter> <br />
                            <CButton style={{ marginRight: "30px", marginLeft: "-20px" }} type="submit" size="md" color="success"><FontAwesomeIcon icon={All.faCheckCircle} /> Add Wallet</CButton>
                            <CButton style={{ marginRight: "30px" }} type="reset" size="md" color="danger"> <FontAwesomeIcon icon={All.faCircle} /> Reset</CButton>
                            <CButton style={{ marginRight: "30px" }} to={"/wallet/walletlist"} type="reset" size="md" color="primary"> <FontAwesomeIcon icon={All.faArrowAltCircleLeft} /> Back</CButton>
                        </CCardFooter> <hr />
                    </CForm>
                    <CCardHeader>The Created Wallet is</CCardHeader>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Wallet Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Currency</th>
                                <th scope="col"> Created </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">{this.state.createdWallet.id}</th>
                                <td>{this.state.createdWallet.name}</td>
                                <td>{this.state.createdWallet.currency}</td>
                                <td>{this.state.createdWallet.created.slice(0, -11)}</td>
                            </tr>
                        </tbody>
                    </table>
                </CCardBody>
            </CCard>
            <NotificationContainer/>
            </div>
        )

    }

}

export default WalletRegister
