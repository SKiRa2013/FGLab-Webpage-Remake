import './Bbs.css';

import { Link } from '../../../routes/Link.jsx';
import { useEffect, useState } from 'react';

import { DateConversion } from '../../DateConversion.jsx';

export default function Bbs() {
	const [posts, setPosts] = useState([]);
	const BASE_URL = 'http://localhost:8000/bbs/posts';

	const fetchPosts = async () => {
		try{
			const response = await fetch(`${BASE_URL}/`);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			
			setPosts(
				data
			);
		} catch (error){
			console.error("ERROR IN POSTS FETCH:", error);
		};
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	useEffect(() => {
		console.log(posts);
	}, [posts]);


	const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const payload = {
            author: {
                name: formData.get("name") || "Anonymous",
                email: formData.get("email") || null,
                password: formData.get("pwd") || "12345678",
            },
            subject: formData.get("sub"),
            message: formData.get("comment"),
            url: formData.get("url") || null,
        };

        // Aquí llamas a tu fetch POST hacia http://localhost:8000/bbs/posts/
        try {
			const response = await fetch(`${BASE_URL}/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},

				body: JSON.stringify(payload)
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const newPost = await response.json();
			setPosts((prevPosts) => [...prevPosts, newPost]);
		
			e.target.reset();
		} catch (error) {
			console.error("ERROR IN POST CREATION:", error);
		}
	};


	return (
        <div className="bbs-container flex flex-col min-h-full">
        	<div className="mb-1" style={{ fontSize: "16px" }}>
            	<div className="m-3">
					<p className="mb-2">Phoenix BBS</p>
					<p className="mt-1 mb-3">(Annex of Future Gadget Laboratory)</p>

					<hr />
				</div>

				<div className="m-5 space-x-2">
					<Link to={"/"} className="classic-anchor">[Return the Top]</Link>
					<Link to={"/pass"} className="classic-anchor">[Admin]</Link>
				</div>

				<hr className="mb-2" />
          	</div>
		
			<div>
				<form onSubmit={handleSubmit}>
					<table cellPadding="2" cellSpacing="4">
						<tbody>
							<tr> 
								<td>
									<b className="mb-1">Name</b>
								</td>
							
								<td>
									<input name="name" size="28" type="text" required className="mb-1 bbs-input" />
								</td> 
							</tr> 
						
							<tr> 
								<td>
									<b className="mb-1">Email</b>
								</td> 
								<td>
									<input name="email" size="28" type="text" className="mb-1 bbs-input" />
								</td> 
							</tr>

							<tr> 
								<td>
									<b className="mb-1">Subject</b>
								</td> 
								<td className="space-x-2"> 
									<input name="sub" size="36" type="text" required className="bbs-input" /> 
									<input value="Submit" type="submit" className="px-2 bg-neutral-300 text-black border border-black cursor-pointer" />
									<input value="Reset" type="reset" className="px-2 bg-neutral-300 text-black border border-black cursor-pointer" /> 
								</td> 
							</tr> 
						
							<tr> 
								<td colSpan="2"> 
									<b className="block mb-3 mt-2">Comment</b>
									<textarea name="comment" cols="56" rows="7" required className="mb-2 bbs-input"></textarea>
								</td> 
							</tr> 
						
							<tr> 
								<td>
									<b>URL</b>
								</td> 
						
								<td>
									<input name={"url"} size={"50"} defaultValue={"http://"} type={"text"} className="mb-2 bbs-input" />
								</td> 
							</tr> 
						
							<tr> 
								<td>
									<b>Password</b>
								</td> 
								<td>
									<label className="inline-flex items-center gap-2 cursor-pointer"> 
										<input name={"pwd"} size={"8"} maxLength={"8"} defaultValue={"12345678"} type={"password"} className="bbs-input" />
										<span>(Password for autologin. 8 characters alphanumeric)</span>
									</label>
								</td> 
							</tr> 

							<tr> 
								<td></td> 
								<td> 
									<label className="inline-flex items-center gap-2 cursor-pointer">
										<input name={"cook"} defaultValue={"on"} defaultChecked={true} type={"checkbox"} className="bbs-input" /> 	
										<span className="mb-7">Save the cookie information</span>
									</label>
								</td> 
							</tr> 
						</tbody>
					</table>
				</form>

				<hr />
			</div>
		
			<div>
				<table style={{textAlign: "left"}} className="w-full">
					<tbody>
						{
						
						posts.map((post, index) => (
							<tr key={post.id} className="border-b border-gray-700">
								<td className="py-3">
                                    <div className="mb-2 space-x-2">
										<span>[{ posts.length - index }]</span>
										<strong>{post.subject}</strong>
										<span>Posted by:</span>
										<span className="df">{post.author.name}#{post.author.tripcode.substring(13, 23)}</span>
										<span>{DateConversion({ dateString: post.created_at })}</span>

										<div className="mb-2">
											{post.message}
										</div>

										{post.url && (
											<div>
												<p className="fake-classic-anchor">
													{post.url}
												</p>
											</div>
										)}
									</div>
								</td>
							</tr>
						))
						
						}
					</tbody>
				</table>
			</div>
		</div>
    );
};
