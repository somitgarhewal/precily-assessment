import React from 'react'

const Table = ({members, selectMemberToEdit}) => {
    return (
        <table className="table container table-bordered table-striped table-hover">
            <thead className="bg-dark textHeading">
                <tr>
                    <th>name</th>
                    <th>Age</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {members.map(element =>
                    <tr key={element._id}>
                        <td >{element.name}</td>
                        <td>{element.age}</td>
                        <td>
                            <button
                                className='editButton'
                                type='button'
                                onClick={() => selectMemberToEdit(element._id)}
                                >
                                <i className='fa fa-edit'></i>
                                edit
                            </button>
                        </td>
                    </tr>)}
            </tbody>
        </table>
    )
}

export default Table