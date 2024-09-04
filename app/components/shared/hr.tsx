export default function Hr({my = true}: { my: boolean }) {
    return (
        <hr className={`${my ? 'my-5' : ''} border-gray-400 dark:border-gray-600`}/>
    )
}