def image():
    import firebase_admin
    from firebase_admin import credentials, storage
    import cv2

    # Initialize Firebase app
    cred = credentials.Certificate("Key.json")
    app = firebase_admin.initialize_app(cred, {'storageBucket': 'codeverse-1eda8.appspot.com'})

    # Initialize Firebase Storage client
    bucket = storage.bucket()

    # List all blobs in the bucket
    blobs = bucket.list_blobs()

    # Sort blobs by last modified time
    blobs_sorted = sorted(blobs, key=lambda x: x.updated, reverse=True)

    # Get the first blob (the one with the latest modification time)
    if blobs_sorted:
        latest_blob = blobs_sorted[0]
        print("Last modified blob:", latest_blob.name)
        # Download the blob if needed
        # latest_blob.download_to_filename("downloaded_image.jpg")
    else:
        print("No blobs found in the bucket.")
    temp_img =" tempimg.jpg"
    latest_blob.download_to_filename(temp_img)
    img = cv2.imread(temp_img)
    # arr = np.frombuffer(latest_blob.download_as_string(), np.uint8)
    # img = cv2.imdecode(arr, cv2.COLOR_BGR2BGR555)
    cv2.imwrite('image.png', img, [int(cv2.IMWRITE_PNG_COMPRESSION), 0])

    # cv2.imshow("gh" ,img)
    # cv2.waitKey(0)
