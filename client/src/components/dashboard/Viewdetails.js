import React, { Component } from 'react'
import axios from 'axios'

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
        alldetails: []
    }
    componentDidMount() {
        axios.get(`/api/gold`)
            .then(res => {
                const alldetails = res.data;
                this.setState({ alldetails });
            })
    }
    render() {

        return (
            <div className="row justify-content-center">
                <div className="col-md-9 ">
                    <br></br>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>GoldID</TableCell>
                                    <TableCell >OwnerName</TableCell>
                                    <TableCell >Weight</TableCell>
                                    <TableCell >RacketId</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.alldetails.map(row => (
                                    <TableRow key={row._id}>
                                        <TableCell component="th" scope="row">
                                            {row.goldid}
                                        </TableCell>
                                        <TableCell >{row.ownerName}</TableCell>
                                        <TableCell >{row.weight}</TableCell>
                                        <TableCell >{row.racketid}</TableCell>
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
