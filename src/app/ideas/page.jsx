

const IdeasPage =async () => {

    const res= await  fetch('http://localhost:5000/idea')
    const data = await res.json()
    console.log(data);
    
    return (
        <div>
            IdeasPage
        </div>
    );
};

export default IdeasPage;