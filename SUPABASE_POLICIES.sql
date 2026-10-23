-- Run in Supabase SQL Editor after creating a PUBLIC bucket named wedding-photos.
-- These policies allow public guest photo uploads and viewing, without guest login.
-- WARNING: Anonymous public uploads can be abused and incur storage costs.

create policy "Wedding photos: public read"
on storage.objects for select to anon
using (bucket_id = 'wedding-photos');

create policy "Wedding photos: anonymous insert"
on storage.objects for insert to anon
with check (
  bucket_id = 'wedding-photos'
  and (storage.foldername(name))[1] in ('haldi','wedding','reception')
  and lower(storage.extension(name)) in ('jpg','jpeg','png','webp','gif','heic')
);

-- Do not add anonymous UPDATE or DELETE policies.
-- To remove a photo, use the Supabase dashboard as project owner.
