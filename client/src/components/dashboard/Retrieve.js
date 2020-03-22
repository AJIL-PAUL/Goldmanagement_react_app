import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button, Row, Col } from "react-bootstrap";
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
export class Retrieve extends Component {
    state = {
        customer_id: "",
        customerdetails: []
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    selectCustomer = e => {

        e.preventDefault();
        const newdata = {
            customer_id: this.state.customer_id
        }
        axios.post(`/api/gold/customer`, newdata)
            .then(res => {
                const customerdetails = res.data;
                this.setState({ customerdetails: customerdetails });
                console.log(customerdetails);
            });

    }
    retrieve = (e) => {

        if (window.confirm("Are you sure to retrieve the gold?")) {
            const newdata = {
                customer_id: this.state.customer_id
            }
            axios.post(`/api/gold/retrieve`, newdata)
                .then(res => {
                    if (res.data) {
                        ToastsStore.success("Customer retrieved gold successfully");
                        console.log(res.data);
                    }
                    else {
                        ToastsStore.error("Customer Already retrieved gold");
                    }
                })
                .catch((err) => {
                    console.log("Error: ", err);
                    ToastsStore.error("Error Occured!");
                });
        }


    }
    render() {
        return (
            <div style={{ marginTop: "2rem" }} className="row justify-content-center">
                <div className="col-sm-6 align-items-center ">
                    <Form onSubmit={this.selectCustomer}>
                        <Form.Group>
                            <Form.Label>CustomerID</Form.Label>
                            <Form.Control
                                placeholder="Enter the customer id"
                                onChange={this.onChange}
                                value={this.state.customer_id}
                                id="customer_id"
                                type="text"
                                required />
                            {/* <Form.Text className="text-muted">

                            </Form.Text> */}
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Id.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>

                    </Form>
                    {this.state.customerdetails.customer_id && <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Name</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    value={this.state.customerdetails.ownerName}
                                    type="text"
                                    disabled
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Weight</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    value={this.state.customerdetails.weight}
                                    type="text"
                                    disabled
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Box ID</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    value={`${this.state.customerdetails.racket_id[0].x_cord} ${this.state.customerdetails.racket_id[0].y_cord}`}
                                    type="text"
                                    disabled
                                />
                            </Col>
                        </Form.Group>
                        <Button variant="primary" onClick={this.retrieve} >
                            Retrieve
                        </Button>
                        <ToastsContainer position={ToastsContainerPosition.BOTTOM_CENTER} store={ToastsStore} />
                    </Form>
                    }
                </div>
            </div>
        )
    }
}

export default Retrieve
