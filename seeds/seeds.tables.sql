BEGIN; 

TRUNCATE
  "folders"
--   "user"
RESTART IDENTITY CASCADE;

INSERT INTO "folders" ("id", "name")
VALUES 
(1, 'Important'),(2, 'Super'),(3, 'Spangley');

-- INSERT INTO notes (id, content, folderId, name, modified)
-- VALUES (
--     "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1", "Dogs", "2019-01-03T00:00:00.000Z", "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur pretium lorem, pellentesque ornare magna. Phasellus id tristique orci. Suspendisse dictum a ipsum sed egestas. Curabitur id laoreet ligula, id tincidunt elit. Aenean molestie lacinia accumsan. Ut ac fermentum risus, tristique congue nisi. Suspendisse in sem lectus. Quisque malesuada, mi eget auctor vestibulum, ligula quam ultricies purus, sed placerat ex lectus at justo. In hac habitasse platea dictumst. Duis eleifend neque quis consectetur fringilla."
-- )

COMMIT;