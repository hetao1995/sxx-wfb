import React,{PureComponent} from 'react'
import axios from "axios";
import {connect} from 'react-redux'
import * as Api from "../../api";
import store from "../../store";
import * as actionTypes from "./store/actionTypes";
import moment from 'moment'
import lodashId from "lodash/uniqueId";
const declareOrderInfo =[
    {
        declarePolicyName:'创业将启动资金正常',
        declareNo: '10988763299762392',
        declareTime: 1538325954,
    },
    {
        declarePolicyName:'创业将启动资金正常',
        declareNo: '10988763299762392',
        declareTime: 1539355954,
    },
    {
        declarePolicyName:'创业将启动资金正常',
        declareNo: '10988763299762392',
        declareTime: 1539385954,
    },
    {
        declarePolicyName:'创业将启动资金正常',
        declareNo: '10988763299762392',
        declareTime: 1539725954,
    },
    {
        declarePolicyName:'创业将启动资金正常',
        declareNo: '10988763299762392',
        declareTime: 1529395954,
    }
];
const productInfo = [
    {
        productName: '企业法律培训',
        providerName:'环泰知识产权有限公司',
        declareNo: '10988763299762392',
        orderID: '1098763299763299762393',
        price: 500000,
        createTime: 1539325954,
    },
    {
        productName: '企业文化培训',
        providerName:'成都香菇年文化传媒有限公司',
        declareNo: '10988763299762392',
        orderID: '1098763299733299762393',
        price: 200000,
        createTime: 1538325954,
    },
    {
        productName: '创意培训',
        providerName:'青稞文化创意有限公司',
        declareNo: '10988763299762392',
        orderID: '1098763299763299762393',
        price: 100000,
        createTime: 1539315954,
    },
    {
        productName: '企业法律培训',
        providerName:'环泰知识产权有限公司',
        declareNo: '10988763299762392',
        orderID: '1098763299763283762394',
        price: 500000,
        createTime: 1539425954,
    },
    {
        productName: '企业文化培训',
        providerName:'成都香菇年文化传媒有限公司',
        declareNo: '10988763299762392',
        orderID: '1098761299763299762324',
        price: 400000,
        createTime: 1539335954,
    }
];
class TransactionList extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            idBox:'',
            idDeclareBox: ''
        }
    }
    componentDidMount(){}

    getInfo=(item)=>{
        axios.get(Api.GET_FIND_TRADE+`?orderID=${item.orderID}`).then(res=>{
            if(res.data.success){
                store.dispatch({
                    type: actionTypes.GET_TRADE_LIST,
                    result: res.data.tradeInformationVos
                })
                console.log(res)
                this.setState({idBox:item.orderID,tradeInfo:this.props.tradeInfo})
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    handleChange=(item)=>{
        this.getInfo(item)
    }

    handleDeclareChange=(item)=>{
        this.getDeclareInfo(item)
    }

    getDeclareInfo=(item)=>{
        axios.get(Api.GET_DECLARE_INFO+`?id=${item.declareNo}`).then(res=>{
            if(res.data.success){
                store.dispatch({
                    type: actionTypes.GET_DECLARE_INFO,
                    result: res.data.scCompanyInfo
                })
                this.setState({idDeclareBox:item.declareNo,declareDetailInfo:this.props.declareDetailInfo},()=>{
                    console.log(this.state.declareDetailInfo)
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    render(){
        return (
            <div className='middle'>
                <span></span>
                {this.props.type=='declare'?
                    <div className="list-box">
                        {declareOrderInfo?declareOrderInfo.map((item)=>{
                            return (
                                <div className={item.declareNo===this.state.idDeclareBox?'active list list1':'list list1'}
                                     key={lodashId()}
                                     onClick={()=>{this.handleDeclareChange(item)}}
                                >
                                    <div className="title">{item.declarePolicyName}</div>
                                    <div className="text">申报单号：{item.declareNo}</div>
                                    <div className="text">申报时间：{item.declareTime}</div>
                                </div>
                            )
                        }):null}
                    </div>
                    :
                    <div className="list-box">
                        {productInfo?productInfo.map((item)=>{
                            return (
                                <div className={item.orderID===this.state.idBox?'active list':'list'}
                                     key={item.orderID}
                                     onClick={()=>{this.handleChange(item)}}
                                >
                                    <div className="title">{item.productName}</div>
                                    <div className="text">订单号：{item.orderID}</div>
                                    <div className="text">交易金融：¥ {item.price}</div>
                                    <div className="text">交易时间：{moment(item.createTime).format('YYYY-MM-DD')}</div>
                                    <div className="text">交易服务商：{item.providerName}</div>
                                    <span></span>
                                </div>
                            )
                        }):null}
                    </div>
                }

            </div>
        )
    }

}
const mapStateToProps=(state)=>({
    tradeInfo: state.wfb.tradeInfo,
    declareDetailInfo:state.wfb.declareDetailInfo
})
export default connect(mapStateToProps,null)(TransactionList)