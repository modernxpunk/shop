import Icon from "./Icon";

const Footer = () => {
	return (
		<footer className="py-4 bg-base-300">
			<div className="container flex flex-col">
				<div className="footer">
					<div>
						<span className="footer-title">Company</span>
						<a className="link link-hover" href="#">
							About us
						</a>
						<a className="link link-hover" href="#">
							Contact
						</a>
						<a className="link link-hover" href="#">
							Jobs
						</a>
						<a className="link link-hover" href="#">
							Press kit
						</a>
					</div>
					<div>
						<span className="footer-title">Legal</span>
						<a className="link link-hover" href="#">
							Terms of use
						</a>
						<a className="link link-hover" href="#">
							Privacy policy
						</a>
						<a className="link link-hover" href="#">
							Cookie policy
						</a>
					</div>
					<div>
						<span className="footer-title">Newsletter</span>
						<div className="form-control">
							<label className="input-group">
								<input
									placeholder="Email"
									type="text"
									className="w-full input input-bordered"
								/>
								<span className="btn btn-primary">subscribe</span>
							</label>
						</div>
					</div>
				</div>
				<div className="my-2 divider"></div>
				<div className="footer">
					<div className="items-center grid-flow-col">
						<p>
							ACME Industries Ltd. <br />
							Providing reliable tech since 1992
						</p>
					</div>
					<div className="md:place-self-center md:justify-self-end">
						<div className="flex gap-4">
							<Icon className="w-6 h-6" name="facebook" />
							<Icon className="w-6 h-6" name="instagram" />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
