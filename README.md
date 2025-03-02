# Editly
A collaborative document editing platform built to understand the inner workings of modern document editing applications.

<video src="https://github.com/abouabra/projects-demo-videos/raw/refs/heads/master/editly/editly.mp4" autoplay loop muted playsinline width="600"></video>

## 📝 Overview
Editly is my experimental project to recreate the core functionality of collaborative document editing platforms. I built this to deepen my understanding of real-time web applications and to explore the technical challenges behind apps like Google Docs. This project represents my journey into complex frontend and backend integrations while solving real-world synchronization problems.

## ✨ Key Features
- **Real-time Collaboration**: Multiple users can edit documents simultaneously
- **Rich Text Editing**: Support for headings, lists, tables, and image uploads
- **Commenting System**: Tag users and discuss specific parts of documents
- **Document Templates**: Choose from various templates for quick document creation
- **Export Options**: Export documents in multiple formats (HTML, PDF)
- **User Management**: Support for personal and organizational accounts


## 🔧 Technical Stack
- **Next.js 15**: React framework for server-rendered applications
- **React 19**: UI library for building component-based interfaces
- **Convex**: Real-time database and backend
- **Liveblocks**: Real-time collaboration infrastructure
- **Clerk**: User authentication and management
- **Tiptap**: Rich text editor framework
- **shadcn/ui**: Beautifully designed components built with Radix UI and Tailwind CSS
- **lucide-react**: Beautiful & consistent icon toolkit for React applications

## 💡 Implementation Details

### 📄 Document Editing
The project uses Tiptap to provide a rich text editing experience with support for:
- Text formatting (bold, italic, underline)
- Headings and paragraphs
- Lists (ordered and unordered)
- Tables
- Image uploads
- Code blocks

### 🔄 Real-time Collaboration
Powered by Liveblocks and Convex, the application demonstrates:
- Simultaneous editing by multiple users
- Presence indicators showing who is currently viewing/editing
- Conflict resolution for concurrent edits

### 👥 User Management
Clerk integration provides:
- User authentication (email, social logins)
- Personal and organizational accounts
- User roles and permissions

## 🎓 My Learning Journey
Through building Editly, I gained valuable insights into:
- How to implement and manage real-time data synchronization between multiple users
- Techniques for creating robust rich text editors with complex formatting options
- Practical approaches to user authentication and permission management in collaborative apps
- Methods for optimizing performance when handling concurrent document edits
- Strategies for structuring a complex frontend application with state management across multiple components
- Solving the technical challenges of conflict resolution when multiple users edit the same document

This project has significantly improved my understanding of full-stack development and real-time web applications, providing me with hands-on experience in building complex, interactive systems.