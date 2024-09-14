import React from 'react'

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form action="" className='mb-5' onSubmit={handleSubmit}>

                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder='Category Name' className='form-control mb-3' />
                <button type='submit' className='btn btn-success'>Submit</button>

            </form>

        </>
    )
}

export default CategoryForm