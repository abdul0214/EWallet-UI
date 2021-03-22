import axios from 'axios';
import { API_URL_WALLET } from '../Constants';

class WalletService {

    getWalletList = (headers) => {
        console.log('executed service: get all Wallets');
        return axios.get(`${API_URL_WALLET}/list`, headers);
    }

    getWalletById = (id) => {
        console.log('executed service: get Wallet By Id');
        return axios.get(`${API_URL_WALLET}/${id}`, this.headers);
    }
    //
    makeTransactionHandler = (id,amount, transactionType) => {
        console.log('executed service: update Wallet');
        return axios.put(`${API_URL_WALLET}/update/${id}`,null,{ params: {'type':transactionType,'amount':amount}});
    }
    //
    // deleteAssetModelByID = (id, headers) => {
    //     console.log('executed service: delete AssetModel by id');
    //     return axios.delete(`${API_URL_INVENTORY}/assetmodel/${id}`, headers);
    // }
    //
    createWalletHandler = (currency,name) => {
        console.log('executed service: create Wallet');
        return axios.post(`${API_URL_WALLET}/create`, null,{ params: {'id':1,'currency':currency,'name':name}});
    }

  headers = {
    headers:
      {
        "Content-Type": "application/json",
      }
  }

}

export default new WalletService()
