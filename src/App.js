/*global chrome*/

import React, {Component} from 'react';
import './App.scss';
import ProductItem from "./components/ProductItem";
import {user} from "./lib/services";
import {getStorage, setStorage} from "./lib/storage";
import {store} from "./lib/store";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            products:[]
        };
        chrome.extension.onMessage.addListener(function(myMessage, sender, sendResponse){
            user.addProduct(myMessage).then(item=>{
                chrome.browserAction.setBadgeBackgroundColor({color: "#64b212"});
                chrome.browserAction.setBadgeText({text: "1"});
            });
            return true;
        });

        const that = this;
        chrome.tabs.getSelected(null, function (tab) {
            if (that.extractRootDomain(tab.url) === 'digikala.com' ) {
                let data = {
                    url: tab.url,
                    discount: true,
                    status: true,
                    increase: true,
                    decrease: true,
                };
                user.addProduct(data).then(r => {
                    console.log(r.data)
                });
            }
        });
        if (!store.token) {
            user.ping().then(r => {
                store.token = r.data.api_token;
                console.log(r.data.api_token)
            });
        }

        user.products().then(r => {
            console.log(r);
            store.products = r.data.products;
            this.setState({
                products: store.products
            });
        })

    }
    extractHostname(url) {
        var hostname;
        //find & remove protocol (http, ftp, etc.) and get hostname

        if (url.indexOf("//") > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }

        //find & remove port number
        hostname = hostname.split(':')[0];
        //find & remove "?"
        hostname = hostname.split('?')[0];

        return hostname;
    }
    extractRootDomain(url) {
        var domain = this.extractHostname(url),
            splitArr = domain.split('.'),
            arrLen = splitArr.length;

        //extracting the root domain here
        //if there is a subdomain
        if (arrLen > 2) {
            domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
            //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
            if (splitArr[arrLen - 2].length === 2 && splitArr[arrLen - 1].length === 2) {
                //this is using a ccTLD
                domain = splitArr[arrLen - 3] + '.' + domain;
            }
        }
        return domain;
    }
    render() {
        if (this.state.products.length==0){
            return null
        }else {
            return (
                <div className="App">
                    <header className="App-header">
                        {this.state.products.map((item,index) => (<ProductItem product={item} index={index}></ProductItem>)
                        )}

                    </header>
                </div>
            );
        }
    }
}

export default App;
