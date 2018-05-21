import '../DataTables/datatables.min.css';
import React, { Component } from 'react';

import '../DataTables/select.dataTables.css' ;

const $ = require('jquery');

$.DataTable = require('datatables.net');
$.DataTableSelect = require('datatables.net-select');

export class Tables extends Component {

    constructor(props){
        super(props);

        this.state = {
            dataSet: props.data
        };

        this.setTableRef = (table) => {
            this.tableRef = table;
        }
    }

    fillTable(){
        let dataSet =[];
        console.log('eshe raz: ' + this.state.dataSet.length);
        if(this.state.dataSet.length === 195){
            for (let i = 0; i < this.state.dataSet.length; i++) {
                dataSet.push(
                    [
                        '',
                        this.state.dataSet[i].userName,
                        this.state.dataSet[i].puzzleScores['Bits and Pieces'].time,
                        this.state.dataSet[i].fullTime
                    ]
                );
            }
        }else {
            for (let i = 0; i < this.state.dataSet.length; i++) {
                dataSet.push(
                    [
                        '',
                        this.state.dataSet[i].userName,
                        this.state.dataSet[i].puzzleScores.Anchor.time,
                        this.state.dataSet[i].puzzleScores['Articles Everywhere'].time,
                        this.state.dataSet[i].puzzleScores.Classy.time,
                        this.state.dataSet[i].puzzleScores['Envious Heirs'].time,
                        this.state.dataSet[i].puzzleScores['Linear'].time,
                        this.state.dataSet[i].puzzleScores['Mariana'].time,
                        this.state.dataSet[i].puzzleScores['Matching Game'].time,
                        this.state.dataSet[i].puzzleScores['Matching Game II'].time,
                        this.state.dataSet[i].puzzleScores['Signing Up'].time,
                        this.state.dataSet[i].puzzleScores['Tech Stack'].time,
                        this.state.dataSet[i].fullTime
                    ]
                );
            }
        }
        return dataSet;
    }

    setColumNames(){
        console.log(this.state.dataSet[0].puzzleScores);
        let columns = [
            { title: 'Comparison' },
            { title: 'User Name' }
        ];
        Object.keys(this.state.dataSet[0].puzzleScores).forEach( (item)=>{
                columns.push({title: item});
            }
        );
        columns.push({title: 'summary'});
        return columns;
    }

    reDrawTable(){
        console.log($('.a1'));
        console.log(this.state.dataSet.length);
        this.table = $(this.tableRef).DataTable(
            {
                data: this.fillTable(),
                columns: this.setColumNames(),
                dom: 'Bfrtip',
                lengthChange: false,
                pageLength: 12,
                tableTools: {
                    sSwfPath: "/swf/copy_csv_xls_pdf.swf"
                },
                oLanguage: {
                    sSearch: "Поиск:"
                },
                columnDefs: [ {
                    orderable: false,
                    className: 'select-checkbox',
                    targets: 0,
                    width: "10%",
                },
                ],
                select: {
                    style: 'multi',
                    selector: 'td:first-child'

                },
                order: [[ 0, 'asc' ]],
            }
        );

        this.table.on( 'user-select',  ( e, dt, type, indexes, originalEvent ) =>{
            const k = originalEvent.target.parentElement.classList.contains('selected');
            if(this.table.rows( '.selected' ).count() > 9  && !k) {
                e.preventDefault();
            }
        } );
    }

    componentDidMount(){
       this.reDrawTable();
    }

    reloadTableData(data) {
        this.table.clear();
        this.table.destroy(false);
        this.forceUpdate();

        this.reDrawTable(data);
        this.table.draw();
    }


    shouldComponentUpdate(nextProps) {
        console.log('shouldComponentUpdate');

        this.state = {
            dataSet: nextProps.data
        };
        this.reloadTableData(nextProps.data);
        return false;
    }

    render(){
        return(<div>
                <table className="display a1" width="100%" ref={this.setTableRef} />
            </div>)
    }
}
