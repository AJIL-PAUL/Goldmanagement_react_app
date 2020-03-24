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
                if (!res.data) {
                    ToastsStore.error("No such Customer!! Invalid ID");
                }
                const customerdetails = res.data;
                this.setState({ customerdetails: customerdetails });
                console.log(customerdetails);
            });

    }
    retrieve = (e) => {
        let customerdetailscopy = JSON.parse(JSON.stringify(this.state.customerdetails));
        if (window.confirm("Are you sure to retrieve the gold?")) {
            const newdata = {
                customer_id: this.state.customer_id
            }
            axios.post(`/api/gold/retrieve`, newdata)
                .then(res => {
                    if (res.data) {
                        ToastsStore.success("Customer retrieved gold successfully");
                        console.log(res.data);

                        //to change state of status to retreived
                        customerdetailscopy.status = "Retrieved"
                        this.setState({
                            customerdetails: customerdetailscopy
                        });
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
                <ToastsContainer position={ToastsContainerPosition.TOP_CENTER} store={ToastsStore} />
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
                        {this.state.customerdetails.status === "Not retrieved" && <Form.Group as={Row}>
                            <Form.Label column sm={2}>Box ID</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    value={`${this.state.customerdetails.racket_id[0].x_cord} ${this.state.customerdetails.racket_id[0].y_cord}`}
                                    type="text"
                                    disabled
                                />
                            </Col>
                        </Form.Group>}
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Box ID</Form.Label>
                            <Col sm={10}>
                                {this.state.customerdetails.status === "Not retrieved" && <div className="alert alert-success alert-dismissible fade show">
                                    <strong>Not yet Retrieved!</strong> You can retrieve.
                                </div>}
                                {this.state.customerdetails.status === "Retrieved" && <div className="alert alert-danger alert-dismissible fade show">
                                    <strong>Already Retrieved!</strong> Sorry, the customer already retrieved the gold.
                                </div>}
                            </Col>
                        </Form.Group>
                        <Button disabled={this.state.customerdetails.status === "Retrieved"} variant="primary" onClick={this.retrieve} >
                            Retrieve
                        </Button>
                    </Form>
                    }
                </div>
            </div>
        )
    }
}

export default Retrieve
