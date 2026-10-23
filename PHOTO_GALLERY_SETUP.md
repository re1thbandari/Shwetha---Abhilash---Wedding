# AbhiShweKalyanam — Photo galleries setup

The website HTML is ready, but uploads cannot work until you connect a storage service. Your existing RSVP / WhatsApp configuration remains unchanged.

## Set up Supabase Storage
1. Create a free Supabase project at https://supabase.com and wait for it to finish provisioning.
2. In Storage, create a bucket named `wedding-photos` and turn ON **Public bucket**.
3. In SQL Editor, run the SQL in `SUPABASE_POLICIES.sql`. These policies allow visitors to upload and view photos without login. They do not allow visitors to delete or overwrite photos.
4. In Project Settings / API (or Connect), copy your Project URL and **publishable key** (or legacy `anon` public key). NEVER use the `service_role` or secret key in the website.
5. In `index.html`, replace `PASTE_SUPABASE_PROJECT_URL` and `PASTE_SUPABASE_PUBLISHABLE_ANON_KEY` with those two values. Keep the quote marks.
6. Upload `index.html`, `sa-royal-lotus-logo.png`, and `Meghaallo.mp3` together to Netlify. Keep all three at the website root.
7. Open the site in an incognito browser, click each function's Photos button, upload a test photo, and verify that it appears on another device.

## What guests can do
- Open Haldi / Wedding / Reception galleries.
- Use camera or upload multiple photos from their device.
- See uploaded images without organiser approval.
- No website-defined limit on photo count. Supabase storage, free-plan quotas, bandwidth, file-size limits, and fair-use limits still apply. For very large galleries, a paid plan or other service may be needed.

## Safety and privacy
- Public photo submissions can be abused. Do not share the link publicly unless you accept this risk. Supabase may throttle or limit excessive uploads.
- Anyone with the site link can view uploaded photos. Obtain guest consent, especially for photos of children.
- To delete an unwanted photo: Supabase Dashboard > Storage > wedding-photos > event folder > select photo > Delete. Visitors cannot delete files through the site.
- The SQL permits anonymous image uploads; there is no login, moderation, or upload-count cap in the website. Storage bucket file-size and MIME restrictions are recommended to control costs, but may reject large/unsupported photos.
- This ZIP does NOT contain a live Supabase account or connected storage. Uploading the ZIP alone will not activate galleries.

## Existing website features
- Mandala reveal, royal lotus logo, Meghaallo music, countdown, and Google Sheets / WhatsApp RSVP code preserved from the supplied HTML.
- Original HTML references `sa-royal-lotus-logo.png` and `Meghaallo.mp3`; these assets are included from the user's previous website package.
