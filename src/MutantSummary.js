import React from 'react';
import './App.css';
import './MutantSummary.css';
import * as d3 from 'd3';
import { SSL_OP_TLS_ROLLBACK_BUG } from 'constants';

class MutantSummary extends React.Component {
    pieRadius = 50;
    colors = {
        "killed" : "green",
        "live" : "red",
        "equivalent" : "yellow"
    };

    extractSummaryInfo() {
        var summaryObj = {};
        summaryObj.killed = this.props.mutants.filter(m => m.killed && !m.equivalent).length;
        summaryObj.equivalent = this.props.mutants.filter(m => m.equivalent).length;
        summaryObj.live = this.props.mutants.filter(m => !m.killed).length;
        summaryObj.productive = this.props.mutants.filter(m => m.productive).length;
        return summaryObj;
    }

    drawPieChart() {
        const svg = d3.select("div#pieChart").append("svg").attr("width", this.pieRadius * 2).attr("height", this.pieRadius * 2);
        const g = svg.append("g").attr("transform", `translate(${this.pieRadius}, ${this.pieRadius})`);

        const pie = d3.pie().value(d => d[1]);
        const arc = d3.arc().innerRadius(0).outerRadius(this.pieRadius);

        let summaryInfo = this.extractSummaryInfo();
        delete summaryInfo.productive;

        console.log(pie(Object.entries(summaryInfo)));
        const arcs = g.selectAll("arc").data(pie(Object.entries(summaryInfo))).enter().append("g").attr("class", "arc");

        arcs.append("path").attr("fill", (d) => this.colors[d.data[0]]).attr("d", arc);
    }

    componentDidMount() {
        this.drawPieChart();
    }

    render() {
        let summaryInfo = this.extractSummaryInfo();

        // TODO: Better way to format the summary numbers? 
        return (
            <div>
                <h2>Summary</h2>
                <div class="panel" id="panel1">
                    <ul>
                        <li>{summaryInfo.killed} - <span id="killed">killed</span></li>
                        <li>{summaryInfo.live} - <span id="live">live</span></li>
                        <li>{summaryInfo.equivalent} - <span id="equivalent">equivalent</span></li>
                        <li>{summaryInfo.productive} - <span>productive</span></li>
                    </ul>
                </div>
                <div class="panel" id="pieChart">
                </div>
                <div id="clear"></div>
            </div>
        );
    }
}

export default MutantSummary;