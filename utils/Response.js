module.exports = (res) => (error, data) => {
	if (error) {
		console.log(error)
		return res.json({
			success: false,
			message: error.message,
		})
	}
	return res.json({
		success: true,
		data,
	})
}
