import {Button, Form, Input, Select} from "antd";
import {useRouter} from "next/router";
import Mymenue from "../menue";

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

export default function addClient(props) {
    const router=useRouter()

    const onFinish = (values) => {
        console.log(values);

        fetch('http://localhost:8080/api/clients', {
            method: 'POST', // or 'PUT'
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })

            .then((data) => {
                router.push("/clients")
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
            <h2>Add Client</h2>
            <br/>

            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item
                    name="first_name"
                    label="First name"

                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="last_name"
                    label="Last Name"

                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
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
