/**
 * fix-cloudinary-urls.js
 * 
 * This script replaces an old Cloudinary cloud name with a new cloud name
 * in all Cloudinary URL fields of all documents in the 'products' collection.
 * 
 * Fields updated: coverImage, additionalImages (array), videos (array)
 * 
 * RUN INSTRUCTIONS:
 * =================
 * Run: node fix-cloudinary-urls.js
 * Dependencies: mongoose and dotenv are already installed in backend
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

// Cloudinary cloud names to replace
const OLD_CLOUD_NAME = 'dzngjsqpe';
const NEW_CLOUD_NAME = 'dnmpxo7ya';

// Get MongoDB URI - supports both MONGO_URI and MONGODB_URI
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

async function fixCloudinaryUrls() {
  console.log('===========================================');
  console.log('Cloudinary URL Fix Script Started');
  console.log('===========================================');
  console.log(`Old Cloud Name: ${OLD_CLOUD_NAME}`);
  console.log(`New Cloud Name: ${NEW_CLOUD_NAME}`);
  console.log('');

  // Check if MONGO_URI is available
  if (!MONGO_URI) {
    console.error('ERROR: MONGO_URI or MONGODB_URI environment variable is not set!');
    console.error('Please set the MONGO_URI environment variable or ensure .env file is configured.');
    process.exit(1);
  }

  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✓ Successfully connected to MongoDB');
    console.log('');

    // Get the products collection
    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');

    // First, count how many documents have the old cloud name in any of the Cloudinary fields
    const filterQuery = {
      $or: [
        { coverImage: { $regex: OLD_CLOUD_NAME, $options: 'i' } },
        { additionalImages: { $elemMatch: { $regex: OLD_CLOUD_NAME, $options: 'i' } } },
        { videos: { $elemMatch: { $regex: OLD_CLOUD_NAME, $options: 'i' } } }
      ]
    };
    
    const countToUpdate = await productsCollection.countDocuments(filterQuery);
    
    console.log(`Found ${countToUpdate} document(s) with the old cloud name in Cloudinary fields`);
    console.log('Fields to update: coverImage, additionalImages, videos');
    console.log('');

    if (countToUpdate === 0) {
      console.log('No documents need to be updated.');
      console.log('');
      console.log('===========================================');
      console.log('Script completed successfully!');
      console.log('===========================================');
      await mongoose.disconnect();
      process.exit(0);
    }

    // Use MongoDB aggregation pipeline with $replaceOne to update the documents
    // Update coverImage field
    const updateCoverImageResult = await productsCollection.updateMany(
      { coverImage: { $regex: OLD_CLOUD_NAME, $options: 'i' } },
      [
        {
          $set: {
            coverImage: {
              $replaceOne: {
                input: '$coverImage',
                find: OLD_CLOUD_NAME,
                replacement: NEW_CLOUD_NAME
              }
            }
          }
        }
      ]
    );

    // Update additionalImages array field
    const updateAdditionalImagesResult = await productsCollection.updateMany(
      { additionalImages: { $elemMatch: { $regex: OLD_CLOUD_NAME, $options: 'i' } } },
      [
        {
          $set: {
            additionalImages: {
              $map: {
                input: '$additionalImages',
                as: 'img',
                in: {
                  $replaceOne: {
                    input: '$$img',
                    find: OLD_CLOUD_NAME,
                    replacement: NEW_CLOUD_NAME
                  }
                }
              }
            }
          }
        }
      ]
    );

    // Update videos array field
    const updateVideosResult = await productsCollection.updateMany(
      { videos: { $elemMatch: { $regex: OLD_CLOUD_NAME, $options: 'i' } } },
      [
        {
          $set: {
            videos: {
              $map: {
                input: '$videos',
                as: 'video',
                in: {
                  $replaceOne: {
                    input: '$$video',
                    find: OLD_CLOUD_NAME,
                    replacement: NEW_CLOUD_NAME
                  }
                }
              }
            }
          }
        }
      ]
    );

    const totalModified = updateCoverImageResult.modifiedCount + 
                          updateAdditionalImagesResult.modifiedCount + 
                          updateVideosResult.modifiedCount;

    console.log(`✓ Documents with coverImage updated: ${updateCoverImageResult.modifiedCount}`);
    console.log(`✓ Documents with additionalImages updated: ${updateAdditionalImagesResult.modifiedCount}`);
    console.log(`✓ Documents with videos updated: ${updateVideosResult.modifiedCount}`);
    console.log(`✓ Total documents modified: ${totalModified}`);
    console.log('');

    // Show sample of updated URLs for verification
    console.log('Sample of updated coverImage URLs:');
    const sampleDocs = await productsCollection
      .find({ coverImage: { $regex: NEW_CLOUD_NAME, $options: 'i' } })
      .limit(3)
      .toArray();

    sampleDocs.forEach((doc, index) => {
      console.log(`  ${index + 1}. ${doc.coverImage}`);
    });
    console.log('');

    console.log('===========================================');
    console.log('Script completed successfully!');
    console.log(`Total documents updated: ${totalModified}`);
    console.log('===========================================');

  } catch (error) {
    console.error('ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    // Close the database connection
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
    process.exit(0);
  }
}

// Run the script
fixCloudinaryUrls();
