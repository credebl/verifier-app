export const post = async ({ request, cookies, redirect }: any) => {
    /* Get body from request */
    const body = await request.json();
    
    const sessionCookie = body?.data

    console.log(234234, request, cookies);

    cookies("session", sessionCookie?.access_token as string, {
        path: "/"
    })
    cookies(cookies, "role", sessionCookie?.role as string, {
        path: "/"
    })

    return redirect('/dashboard');

};