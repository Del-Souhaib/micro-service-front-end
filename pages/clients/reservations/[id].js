import {Input, Menu, Space, Table} from "antd";
import Link from "next/link";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import Mymenue from "../../menue";

export default function reservations(props) {


    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Product Price',
            dataIndex: 'productPrice',
            key: 'productPrice',
            render: (text) => <span>{text} €</span>,
        },

    ];
    console.log(props)

    return (
        <div style={{margin: "50px 50px 50px 50px"}}>
            <Mymenue/>

            <br/>
            <h2>Client</h2>
            <br/>

            <div style={{display: "flex"}}>
                <div style={{width: "30%"}}>
                    <label>First name : {props.client.first_name}</label>

                </div>
                <div style={{width: "30%"}}>
                    <label>Last name : {props.client.last_name}</label>

                </div>
                <div style={{width: "30%"}}>
                    <label>Email: {props.client.email}</label>

                </div>
            </div>
            <br/>
            <br/>

            <h2>Orders</h2>
            <Table columns={columns} dataSource={props.reservations}/>

        </div>
    )
}

export async function getServerSideProps(context) {
    const {id} = context.query
    const res = await fetch(`http://localhost:8080/api/clients/` + id)
    const client = await res.json()

    const res2 = await fetch(`http://localhost:8080/api/orders/` + id)
    const reservations = await res2.json()

    return {
        props: {client,reservations}, // will be passed to the page component as props
    }
}
