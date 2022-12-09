import {Space, Table} from "antd";
import Link from "next/link";
import mymenue from "../menue";
import Mymenue from "../menue";


export default function clients(props) {

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Client',
            dataIndex: 'clientId',
            key: 'clientId',
            render: (text) => <Link href={"/clients/reservations/"+text}>Client</Link>,
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
        },

    ];
    console.log(props)
    return (
        <div style={{margin: "50px 50px 50px 50px"}}>
            <Mymenue/>
            <Table columns={columns} dataSource={props.clients}/>
        </div>
    )
}

export async function getServerSideProps(context) {

    const res = await fetch(`http://localhost:8080/api/orders`)
    const clients = await res.json()

    return {
        props: {clients}, // will be passed to the page component as props
    }
}
