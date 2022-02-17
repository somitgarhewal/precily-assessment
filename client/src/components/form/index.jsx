import React, { useState, useEffect } from 'react'

const MemberForm = ({ data, handleSubmit }) => {
    const [name, setName] = useState('')
    const [age, setAge] = useState('')

    useEffect(() => {
        if (data._id) {
            setName(data.name);
            setAge(data.age)
        }
    }, [data])

    const handleOnSubmit = () => {
        if (name.trim() === '') {
            return alert('please insert Name');
          }
          if (age === '') {
            return alert('please insert Age');
          }
        const submissionData = { name, age };
        if (data._id) {
            submissionData['_id'] = data._id
        }
        handleSubmit(submissionData);
        setName('');
        setAge('')
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='border rounded m-5 p-5'>
                    Name:
                    <input
                        className='form-control'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    Age :
                    <input
                        className='form-control'
                        type='number'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <br />
                    <br />

                    <button type="button" onClick={() => handleOnSubmit()} className='mt-3'>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default MemberForm