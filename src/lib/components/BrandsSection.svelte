<script lang="ts">
	const brands = [
		'BANK MANDIRI',
		'TELKOM INDONESIA',
		'GOTO GROUP',
		'ASTRA DIGITAL',
		'FLIP ID',
		'SIRCLO OMNICHANNEL',
		'BRI VENTURES',
		'MODALKUKU',
		'MAJOO INDONESIA',
		'RUANGGURU'
	];

	// Duplicate for smooth infinite track
	const loopBrands = [...brands, ...brands];
</script>

<section class="brands">
	<div class="container">
		<h5 class="brands-title wow fadeInUp">
			Lebih dari 30+ Perusahaan & Startup Mempercayai Kolaborasi Kami
		</h5>
	</div>

	<div class="brands-marquee-wrapper" aria-hidden="true">
		<div class="brands-track">
			{#each loopBrands as brand, idx (idx)}
				<div class="brand-item">
					<span class="brand-pill">{brand}</span>
					<span class="brand-dot">/</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.brands {
		padding: 70px 0;
		background: #ffffff;
		border-bottom: 1px solid rgba(10, 22, 40, 0.08);
		overflow: hidden;
	}
	.brands-title {
		font-family: var(--ff-syne);
		font-size: 14px;
		font-weight: 700;
		color: var(--clr-gray);
		text-transform: uppercase;
		letter-spacing: 0.12em;
		text-align: center;
		margin-bottom: 36px;
	}

	.brands-marquee-wrapper {
		width: 100%;
		overflow: hidden;
		display: flex;
	}
	.brands-track {
		display: flex;
		gap: 40px;
		width: max-content;
		animation: scrollBrands 28s linear infinite;
		align-items: center;
	}
	.brand-item {
		display: flex;
		align-items: center;
		gap: 40px;
	}
	.brand-pill {
		font-family: var(--ff-syne);
		font-size: clamp(20px, 2.5vw, 30px);
		font-weight: 800;
		color: var(--clr-navy);
		opacity: 0.4;
		letter-spacing: 0.04em;
		transition: all 0.3s ease;
		cursor: default;
	}
	.brand-pill:hover {
		opacity: 1;
		color: var(--clr-accent);
		transform: scale(1.05);
	}
	.brand-dot {
		color: rgba(10, 22, 40, 0.15);
		font-weight: 700;
		font-size: 20px;
	}
</style>
