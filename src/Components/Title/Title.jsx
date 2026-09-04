const Title = ({ heading, count }) => {
    return (
        <h1 className='text-blue-700 font-bold my-10 mx-5 md:mx-8 text-md'>
            { heading }{ ' ' }
            { <span className='text-green-400 text-5xl font-bold'>{ count }</span> }
        </h1>
    );
};

export default Title;
