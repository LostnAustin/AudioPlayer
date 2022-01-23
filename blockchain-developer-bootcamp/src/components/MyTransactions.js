import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import { 
    myFilledOrdersLoadedSelector,
    myFilledOrdersSelector,
    myOpenOrdersLoadedSelector,
    myOpenOrdersSelector
} from '../store/selectors'

const showMyFilledOrders = (myFilledOrders) => {
    return(
        <tbody>
            { myFilledOrders.map((order) => {
                return (
                    <tr key={order.id}>
                        <td className='text-muted'>{order.formattedTimestamp}</td>
                        <td className={`text-${order.orderTypeClass}`}>{order.orderSign}{order.tokenAmount}</td>
                        <td lassName={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
                    </tr>
            )
            })}
        </tbody>
    )
}


class MyTransactions extends Component {
    render() {
        return (
            <div className="card bg-dark text-white">
                <div className="card-header">
                    My Transactions
                </div>
                <div className='card-body'>
                    <Tabs defaultActiveKey='trades' className='bg-dark text-white'>
                        <Tab eventKey='trades' title='Trades' classname='bg-dark'>
                            <table className='table table-dark table-sm small'>
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>FLOW</th>
                                        <th>FLOW/ETH</th>
                                    </tr>
                                </thead>
                            </table>
                        </Tab>

                        <Tab eventKey='orders' title='Orders'>
                            <table className='table table-dark table-sm small'>
                                <thead>
                                    <tr>
                                        <th>Amount</th>
                                        <th>FLOW/ETH</th>
                                        <th>Cancel</th>
                                    </tr>
                                </thead>
                            </table>
                        </Tab>
                    </Tabs>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        myFilledOrders: myFilledOrdersSelector(state),
        showMyFilledOrders: myFilledOrdersLoadedSelector(state),
        myOpenOrders: myOpenOrdersSelector(state),
        showMyOpenOrders: myOpenOrdersLoadedSelector(state)
    }
}


export default connect(mapStateToProps)(MyTransactions);