import {Button, Form, Input, Select} from "antd";
import Mymenue from "../../../menue";
import {useRouter} from "next/router";

const {Option} = Select;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

export default function add(props) {
const router=useRouter()

    const onFinish = (values) => {
        console.log(values);

        fetch('http://localhost:8080/api/orders', {
            method: 'POST', // or 'PUT'
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })

            .then((data) => {
                router.push("/clients/reservations/"+props.client?.id)
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    };

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

            <h2>Add Order</h2>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item
                    name="productName"
                    label="Product"

                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="productPrice"
                    label="Price"

                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="clientId"
                    label="Client id"
                    initialValue={props.client.id}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export async function getServerSideProps(context) {
    const {id} = context.query
    const res = await fetch(`http://localhost:8080/api/clients/`+id)
    const client = await res.json()

    return {
        props: {client}, // will be passed to the page component as props
    }
}
