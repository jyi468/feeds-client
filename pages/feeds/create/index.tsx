import Link from "next/link";

const CreateFeed = () => {
    // TODO: Create configuration object for each feed type.
    return (
        <div className="container grid grid-cols-3 place-content-center mt-8">
            <div className="card mx-4 my-8 bg-base-100 shadow-xl">
                <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Instant</h2>
                    <p>Copy and paste your link to see your feed come to life in real time! Recommended for beginners.</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Create Instant</button>
                    </div>
                </div>
            </div>
            <div className="card mx-4 my-8 bg-base-100 shadow-xl">
                <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">List</h2>
                    <p>Add your links one by one, using list rows. Recommended for most users.</p>
                    <div className="card-actions justify-end">
                        <Link href="/feeds/create/list">
                            <button className="btn btn-primary">Create List</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="card mx-4 my-8 bg-base-100 shadow-xl">
                <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">CSV</h2>
                    <p>Paste/Upload CSV with your links to create your board. Recommended for experts.</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Create CSV</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateFeed;