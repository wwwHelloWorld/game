export async function getData() {
    const res = await fetch('http://localhost:3005/data', { next: { revalidate: 5 } })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    return res.json()
  }
  export const updateData = async (newData: any) => {
    try {
      const response = await fetch('http://localhost:3005/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        console.log('Массив данных успешно обновлен');
      } else {
        console.error('Ошибка при обновлении массива данных');
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };
