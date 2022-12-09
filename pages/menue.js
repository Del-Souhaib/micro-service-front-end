import {Menu} from "antd";
import Link from "next/link";


export default function Mymenue() {
    return (
        <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
            <Menu.Item key="clients">
                <Link href={"/clients"}>List Clients</Link>
            </Menu.Item>
            <Menu.Item key="addclients">
                <Link href={"/clients/add"}>Add Clients</Link>
            </Menu.Item>

            <Menu.Item key="orders">
                <Link href={"/orders"}>List Orders</Link>
            </Menu.Item>

        </Menu>

    )
}