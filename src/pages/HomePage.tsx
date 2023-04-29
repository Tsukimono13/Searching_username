import {githubApi, useLazyGetUserReposQuery, useSearchUsersQuery} from "store/github/github.api";
import React, {useState, useEffect} from 'react';
import {useDebounce} from "hooks/debounce";
import RepoCart from "components/RepoCart";

const HomePage = () => {
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const debounced = useDebounce(search)
    const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3, refetchOnFocus: true
    })
    const [fetchRes, {isLoading: loading, data: repos}] = useLazyGetUserReposQuery()
    const onClickHandler = (user: string) => {
       fetchRes(user)
        setDropdown(false)
    }

    useEffect(() => {
        setDropdown(debounced.length > 3 && data?.length! > 0)
    }, [debounced, data])

    return (
        <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
            {isError && <p className='text-center text-red-600 px-4'>Something went wrong...</p>}

            <div className='relative w-[560px]'>
                <input type='text'
                       className='border py-2 px-4 w-full h-[42px] mb-2'
                       placeholder='Write username for seaching on Github...'
                       value={search}
                       onChange={e => setSearch(e.target.value)}
                />

                {dropdown &&
                    <ul className='list-none absolute top-[42px] left-0 right-0 px-4 max-h-[200px] overflow-y-scroll shadow-md bg-gray-300 text-black'>
                        {isLoading && <p className='text-center'>Is loading...</p>}
                        {data?.map(u => (
                                <li key={u.id}
                                    onClick={() => onClickHandler(u.login)}
                                    className='px-2 py-2 hover:bg-gray-300 hover:text-white transition-colors cursor-pointer'>
                                    {u.login}
                                </li>
                            )
                        )}
                    </ul>}
                <div className='container'>
                    {loading && <p className='text-center'>Repos are loading...</p>}
                    {repos?.map(repo => <RepoCart repo={repo} key={repo.id}/>)}
                </div>
            </div>
        </div>
    );
};

export default HomePage;