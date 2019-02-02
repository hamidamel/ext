import React, {Component} from "react";
import {user} from "../lib/services";
import {store} from "../lib/store";

class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: props.product
        }
        if (this.state.product.off == null) this.state.product.off = 0;
    }

    removeItem() {
        user.remove({url: this.state.product.url}).then((item) => {
            store.products = store.products[this.state.index];
            alert("Item Removed" + this.state.product.name);
        })
    }

    render() {
        return (
            <div className={"item"} >
                <div className={"main-content"}>
                    <div className={"image"}>
                        {this.state.product.off>0 ?<span className={'off-label'}>
                            {this.state.product.off} %
                        </span>:null}
                        <img
                            src={this.state.product.cover}></img>
                    </div>
                    <div className={"content"}>
                        <a className={"title"} href={this.state.product.affiliate} target={"_blank"}>
                            {this.state.product.name}
                        </a>
                        <div className={"subtitle"}>
                       <span>فروشنده: {this.state.product.seller.name}
</span>
                            <span>دسته: {this.state.product.category.name}
</span>
                            {/*<span>برند: {this.state.product.brand.name}*/}
                            {/*</span>*/}

                        </div>
                        <div className={"subtitle"}>
<span>بروزرسانی: 22:14 1397/10/30
</span>

                        </div>
                        <div className={'options'}>

                            {this.state.product.colors.map(item => (
                                <span className={'color-span'} style={{background: `${item}`}}></span>))}
                        </div>
                    </div>
                </div>


                <div className={"footer"}>

                    <div className={"price"}>
                        {this.state.product.isOffer ? <div className={'label white'}>
                            {this.state.product.price.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </div>: null}
                        <span className={this.state.product.isOffer ? "label blue" : 'label blue full'}>
                        {(this.state.product.price - ((this.state.product.price * this.state.product.off) / 100)).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) } تومان
                        </span>
                    </div>
                    <a href={this.state.product.affiliate} className={'cart_button'} target={"_blank"}>
                        <i className={"material-icons"}>add_shopping_cart</i>

                    </a>
                    <a href={this.state.product.affiliate} className={'cart_button'} target={"_blank"}>
                        <i className={"material-icons"}>notifications</i>

                    </a>
                    <a onClick={() => this.removeItem()} className={'cart_button'} target={"_blank"}>
                        <i className={"material-icons"}>delete</i>

                    </a>
                </div>
            </div>
        )
    }
}

export default ProductItem;