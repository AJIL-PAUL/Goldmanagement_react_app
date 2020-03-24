import React, { Component } from 'react'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
export class Boxdetails extends Component {
    state = {
        alldetails: []
    }
    componentDidMount() {
        this.refresh()
    }
    refresh = () => {
        axios.get(`/api/gold/boxdetails`)
            .then(res => {
                const alldetails = res.data;
                this.setState({ alldetails: alldetails });
                console.log(alldetails);
            })
    }

    render() {
        return (
            <div style={{ marginTop: "2rem" }} className="row justify-content-center ">
                <div className="col-lg-9 ">
                    <h2>Box Details</h2>
                    <br></br>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Box ID</TableCell>
                                    <TableCell >Total Weight (gram)</TableCell>
                                    <TableCell >Remaining Wiegth (gram)</TableCell>
                                    <TableCell >No. of Items</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {this.state.alldetails.map((row, index) => (
                                    <TableRow style={index % 2 ? { background: "#f7f7f7" } : { background: "white" }} key={row._id}>
                                        <TableCell component="th" scope="row">
                                            {row.racket_id[0].x_cord} {row.racket_id[0].y_cord}
                                        </TableCell>
                                        <TableCell >{row.total_weight}g</TableCell>
                                        <TableCell >{row.rem_weight}g</TableCell>
                                        <TableCell >{row.no_of_items}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <p>Other boxes are empty</p>
                </div>
            </div>
        )
    }
}

export default Boxdetails
