import React from 'react'

const DisplayAnalytics = ({ analyticsData }) => {

    return (
        <div className="table-responsive">
            <table className="table container table-bordered table-striped table-hover">
                <thead className="bg-dark text-white textHeading">
                    <tr>
                        <th>Api Type</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {analyticsData.map(element =>
                        <tr key={element._id}>
                            <td >{element.name}</td>
                            <td>{element.count}</td>
                        </tr>)
                    }
                    <tr key={'totalApiCountKey'}>
                        <td >Total Api Count</td>
                        <td>{analyticsData.reduce((a, b) => a + (b['count'] || 0), 0)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DisplayAnalytics