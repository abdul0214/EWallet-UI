import React, { Component } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel, CSelect,
} from '@coreui/react';
import { Link } from 'react-router-dom';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as All from '@fortawesome/free-solid-svg-icons';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import WalletService from '../../api/WalletService.js';

const getCurrencyName = currency => {
  switch (currency) {
    case 'USDOLLAR_$': return 'US Dollar $'
    case 'AUSTRALIANDOLLAR_A$': return 'Australian Dollar A$'
    case 'CANADIANDOLLAR_CA$': return 'Canadian Dollar CA$'
    case 'STERLINGPOUND_£': return 'Sterling Pound £'
    case 'JAPANESEYEN_¥': return 'Japanese Yen ¥'
    case 'SWISSFRANC_CHF': return 'Swiss Franc CHF'
    case 'SWEDISHKORONA_SEK': return 'Swedish Corona SEK'
    default: return currency
  }
}


class WalletList extends Component {

    //constructor
    constructor(props) {
        super(props)
        this.state = {
            wallets: [],
            walletKeys: [],

            modalState: false,

            id: '',
            name: '',
          amount: '',
          transactionType: '',
          currency: '',
          balance: '',

            walletByID: {},
            assetModelID: null,
            deletedAssetModelByID: {},

            //for put request,
            updateAssetModelID: '',
            updateAssetModelName: '',
            updateAssetModelDescription: '',
            updateAssetModelModel: '',
            updateAssetModelManufacturer: '',
            updatedWallet: {},
        }
    }

    // on page load
    componentDidMount() {
        this.getWalletList();
    }

    getWalletList = () => {
      WalletService.getWalletList()
            .then(response => {
                if(response.status === 200) {
                    // NotificationManager.success('Wallets Fetched', response.statusText);
                    this.setState({
                        wallets: response.data,
                        walletKeys: Object.keys(response.data[0]).filter(item =>  !(['_links','details','created'].includes(item)))
                    })
                } else {
                    NotificationManager.warning("Please check later", response.statusText)
                }
            }).catch(error => {
                let errorMessage;
                console.log(error)
                if (error.response) {
                    errorMessage = "Some unknown error occurred!";
                    this.setState({errorMessage: errorMessage})
                } else if (error.request) {
                    errorMessage = "The request was made but no response was received";
                    this.setState({errorMessage: errorMessage})
                } else {
                    errorMessage = error.message;
                    this.setState({errorMessage: errorMessage})
                }
                NotificationManager.warning(errorMessage, 'OOPS...');
            })
    }

  getWalletById = (id) => {

        if(id === null){
            NotificationManager.warning("Missing or Invalid ID. Make sure you have selected a correct Wallet")
        } else {
            WalletService.getWalletById(id)
            .then(response => {
                if(response.status === 200) {
                    NotificationManager.success(`You are viewing information about ${response.data.name}`, response.statusText)
                    this.setState({
                        walletByID: response.data,
                        id: response.data.id,
                        name: response.data.name,
                        currency: response.data.currency,
                        balance: response.data.balance,
                    })
                    this.toggleModalState();
                } else {
                    NotificationManager.warning("Please check later", response.statusText)
            }})
            .catch(error => {
                let errorMessage;
                if (error.response) {
                    errorMessage = "Some unknown error occurred!";
                    this.setState({errorMessage: errorMessage})
                } else if (error.request) {
                    errorMessage = "The request was made but no response was received";
                    this.setState({errorMessage: errorMessage})
                } else {
                    errorMessage = error.message;
                    this.setState({errorMessage: errorMessage})
                }
                NotificationManager.warning(errorMessage, 'OOPS...');
            })
        }
    }

    // Update Vendor Info Request
    makeTransactionHandler = (event) => {
        event.preventDefault();
        let id = this.state.id
      let amount = this.state.amount
      let transactionType = this.state.transactionType

        if(!amount) {
            NotificationManager.warning("Incorrect Request Param");
        } else {
            WalletService.makeTransactionHandler(id,amount,transactionType)
            .then(response => {
                if(response.status === 200) {
                    NotificationManager.success(`You have updated balance for ${response.data.name}`, response.statusText)
                    this.setState({
                        updatedWallet: response.data,
                        modalState: !this.state.modalState
                    })
                    this.getWalletList();
                } else {
                    NotificationManager.warning("Please check later", response.statusText)
            }})
            .catch(error => {
                let errorMessage;
                if (error.response) {
                    errorMessage = "Some unknown error occurred!";
                    this.setState({errorMessage: errorMessage})
                } else if (error.request) {
                    errorMessage = "The request was made but no response was received";
                    this.setState({errorMessage: errorMessage})
                } else {
                    errorMessage = error.message;
                    this.setState({errorMessage: errorMessage})
                }
                NotificationManager.warning(errorMessage, 'OOPS...');
            })
        }
    }

    toggleModalState = () => {
        this.setState({
            modalState: !this.state.modalState
        });
    }

    inputChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <CCard>
                    <CCardHeader>
                        Wallet List
                        <div className="card-header-actions">
                            <FontAwesomeIcon icon={All.faPlusSquare} /> <Link to={"/wallet/walletRegister"} className="card-header-action">Add New Wallet</Link>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            sorter={true}
                            columnFilter={true}
                            items={this.state.wallets}
                            fields={this.state.walletKeys}
                            light
                            hover
                            striped
                            outlined
                            size="m"
                            itemsPerPage={7}
                            pagination
                            onRowClick={(row) => this.getWalletById(row.id)}
                            scopedSlots={{
                              'currency':
                                (item) => (
                                  <td>
                                      {getCurrencyName(item.currency)}
                                  </td>
                                ),
                              'customer':
                                (item) => (
                                  <td>
                                    {item.customer.name}
                                  </td>
                                ),

                            }}
                        />
                    </CCardBody>
                    <CModal
                        show={this.state.modalState}
                        onClose={this.toggleModalState}
                    >
                        <CModalHeader closeButton>
                            <CModalTitle>Top-Up / Withdraw</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <CForm onSubmit={this.makeTransactionHandler} encType="multipart/form-data" className="form-horizontal">
                                <CFormGroup row>
                                    <CCol xs="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="id">Id</CLabel>
                                            <CInput id="id" name="id" type="text" value={this.state.id} required readOnly />
                                        </CFormGroup>
                                    </CCol>
                                  <CCol xs="6">
                                    <CFormGroup>
                                      <CLabel htmlFor="name">Name</CLabel>
                                      <CInput id="name" name="name" type="text" value={this.state.name} required readOnly />
                                    </CFormGroup>
                                  </CCol>
                                </CFormGroup>

                              <CFormGroup row>
                                <CCol xs="6">
                                  <CFormGroup>
                                    <CLabel htmlFor="currency">Currency</CLabel>
                                    <CInput id="currency" name="currency" type="text" value={this.state.currency} required readOnly />
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="6">
                                  <CFormGroup>
                                    <CLabel htmlFor="name">Balance</CLabel>
                                    <CInput id="balance" name="balance" type="text" value={this.state.balance} required readOnly />
                                  </CFormGroup>
                                </CCol>
                              </CFormGroup>
                              <CFormGroup row>

                                <CCol xs="6" >
                                  <CFormGroup >
                                    <CLabel htmlFor="type-input">Transaction Type</CLabel>
                                    <CSelect custom name="transactionType" value={this.state.transactionType} onChange={this.inputChangeHandler} >
                                      <option value="CREDIT">Top Up</option>
                                      <option value="DEBIT">Withdraw</option>
                                    </CSelect>
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="6">
                                  <CFormGroup >
                                    <CLabel htmlFor="balance-input">Amount</CLabel>
                                    <CInput id="amount" name="amount" type="text" value={this.state.amount} onChange={this.inputChangeHandler}  />
                                  </CFormGroup>
                                </CCol>
                              </CFormGroup>

                            </CForm>
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="info" onClick={this.makeTransactionHandler}>Transfer</CButton>{' '}
                            <CButton color="secondary" onClick={this.toggleModalState}>Cancel</CButton>
                        </CModalFooter>
                    </CModal>
                </CCard>
                <NotificationContainer/>
            </div>
        )
    };
}

export default WalletList
