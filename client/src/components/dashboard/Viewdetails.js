import React, { Component } from 'react'
import axios from 'axios'

import { Form, Button } from "react-bootstrap";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export class Viewdetails extends Component {
    // Inintiating details array
    state = {
        alldetails: [],
        status: "not_retrieved"
    }
    componentDidMount() {
        this.refresh()
    }
    refresh = () => {
        axios.get(`/api/gold/customer/${this.state.status}`)
            .then(res => {
                const alldetails = res.data;
                this.setState({ alldetails: alldetails });
                console.log(alldetails);
            })
    }
    onSubmit = e => {
        e.preventDefault();
        this.refresh();
    }
    onChange = e => {
        this.setState({ status: e.target.value });
    };
    render() {

        return (
            <div style={{ marginTop: "2rem" }} className="row justify-content-center ">
                <div className="col-md-4 mr-auto ">
                    <Form onSubmit={this.onSubmit}>
                        <h3>Customer details</h3><br></br>
                        <Form.Group >
                            <Form.Label>Select Status</Form.Label>
                            <Form.Control as="select" onChange={this.onChange}>
                                <option value="not_retrieved">Not Retrieved</option>
                                <option value="retrieved">Retrieved</option>
                            </Form.Control>

                        </Form.Group>
                        <Button type="submit">Submit</Button>
                    </Form>
                </div>
                <div className="col-md-12 ">
                    <br></br>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>CustomerId</TableCell>
                                    <TableCell >OwnerName</TableCell>
                                    <TableCell >Weight</TableCell>
                                    <TableCell >RacketId</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.alldetails.map((row, index) => (
                                    <TableRow style={index % 2 ? { background: "#f7f7f7" } : { background: "white" }} key={row._id}>
                                        <TableCell component="th" scope="row">
                                            {row.customer_id}
                                        </TableCell>
                                        <TableCell >{row.ownerName}</TableCell>
                                        <TableCell >{row.weight}g</TableCell>
                                        <TableCell >{row.racket_id[0].x_cord} {row.racket_id[0].y_cord}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        )
    }
}
export default Viewdetails;
