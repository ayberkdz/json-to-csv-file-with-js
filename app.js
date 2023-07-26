fetch('https://reqres.in/api/users')
	.then((res) => res.json())
	.then((data) => handle(data));

function handle(datas) {
	const header = Object.keys(datas.data[0]).toString();

	const main = datas.data.map((item) => {
		return Object.values(item).toString();
	});

	const csv = [header, ...main].join('\n');

	CSVDownloader(csv);
}

function CSVDownloader(param) {
	const blob = new Blob([param], { type: 'application/csv' });

	const url = URL.createObjectURL(blob);

	// console.log(url);

	const btn = document.getElementById('btn');
	btn.addEventListener('click', () => {
		const link = document.createElement('a');

		let randomFileName =
			(Math.random() + 1).toString(36).substring(3) + '-example-csv-file';

		link.download = `${randomFileName}.csv`;
		link.href = url;
		link.style.display = 'none';

		document.body.appendChild(link);

		link.click();

		link.remove();
		URL.revokeObjectURL(url);
	});
}
