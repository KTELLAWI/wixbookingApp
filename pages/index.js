import Link from 'next/Link'

const Home = () => {
    return (
        <div className="main">
            <article className='main-info-container'>
                <h1>Simplify Your Fitness Training  Experience with Our Fitness Booking App </h1>
                <p>


                </p>
                <div className='button-container'>
                    <Link href='/search' className='primary'>
                        Try it
                    </Link>
                    <Link href='/search' className='secondary'>
                        Tell me more about </Link>
                </div>
                <Link href='/search'>
                    check the fitness salone and staffs</Link>
                <p className='disclaimer'>
                    you can call us before having an appointment for further of details

                </p>

            </article>

        </div>
    )
}

export default Home