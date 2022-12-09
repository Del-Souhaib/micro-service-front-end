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
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link href={"/clients/reservations/" + record.id}>Orders list</Link>
                    <Link href={"/clients/reservations/add/" + record.id}>Add Order</Link>

                </Space>
            ),
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

    const res = await fetch(`http://localhost:8080/api/clients`)
    const clients = await res.json()

    return {
        props: {clients}, // will be passed to the page component as props
    }
}
