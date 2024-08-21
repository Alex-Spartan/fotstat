const date = new Date();
const getMonth = date.getMonth() + 1;
const currentDate = getMonth < 10 ? `${date.getFullYear()}-0${getMonth}-${date.getDate()}` : `${date.getFullYear()}-${getMonth}-${date.getDate()}`;

export const fetcher = async (path: string, baseUrl=process.env.NEXT_PUBLIC_BASE_URL!,  date=currentDate) => {
    try {
        const res = await fetch(`${baseUrl}${path}?date=${date}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY!,
            },
        });
        return await res.json();
    } catch (err) {
        console.error('Error fetching data:', err);
        return null;
    }
}