import React, {useState} from 'react';
import {ReposType} from "models/models";
import {useActions} from "hooks/actions";
import {useAppSelector} from "hooks/redux";

const RepoCart = ({repo}: { repo: ReposType }) => {
    const {addFavourites, removeFavourites} = useActions()
    const {favourites} = useAppSelector(state => state.github)

    const [fav, setIsFav] = useState(favourites.includes(repo.html_url))

    const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        addFavourites(repo.html_url)
        setIsFav(true)
    }
    const removeFromFavourites = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        removeFavourites(repo.html_url)
        setIsFav(false)
    }
    return (
        <div className='border px-5 py-3 mb-2 rounded hover:shadow-md hover:bg-fuchsia-100 transition-all'>
            <a href={repo.html_url} target='_blank'>
                <h2 className='text-lg font-bold'>{repo.full_name}</h2>
                <p className='text-sm mr-2'>
                    Language: <span className='font-bold mr-3'>{repo.language}</span>
                    Watchers: <span className='font-bold mr-3'>{repo.watchers}</span>
                    Forks: <span className='font-bold'>{repo.forks}</span>
                </p>
                <p className='text-sm font-thin mt-2'>{repo?.description}</p>
                {!fav && <button className='py-2 mt-1 px-4 mr-2 bg-amber-500 rounded hover:shadow-md transition-all'
                        onClick={addToFavourite}>
                    Add
                </button>}
                {fav && <button className='py-2 px-4 mt-1 bg-red-500 rounded hover:shadow-md transition-all'
                        onClick={removeFromFavourites}>
                   Remove
                </button>}
            </a>
        </div>
    );
};

export default RepoCart;