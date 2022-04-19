module.exports = (total, page = 1, limit = 10) => {

	let total_page = Math.ceil(parseInt(total) / parseInt(limit)),
		per_page = parseInt(limit),
		current = parseInt(page),
		next = Math.ceil(total / limit) > current ? current + 1 : null,
		previous = current > 1 ? current - 1 : null

	return {
		total_page,
		per_page,
		current,
		total,
		next,
		previous,
	}
}