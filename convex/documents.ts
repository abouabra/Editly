import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const createDocument = mutation({
	args: {
		title: v.optional(v.string()),
		initialContent: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();

		if (!user) {
			throw new ConvexError("Unauthorized");
		}

		const organizationId = (user.organization_id ?? undefined) as string | undefined;

		return await ctx.db.insert("documents", {
			title: args.title || "Untitled Document",
			ownerId: user.subject,
			organizationId,
			initialContent: args.initialContent,
		});
	},
});

export const getDocuments = query({
	args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
	handler: async (ctx, {paginationOpts, search}) => {
		const user = await ctx.auth.getUserIdentity();

		if (!user) {
			throw new ConvexError("Unauthorized");
		}
		
		const organizationId = (user.organization_id ?? undefined) as string | undefined;

		if (search && organizationId) {
			return await ctx.db.query("documents")
				.withSearchIndex(
					"search_title", 
					(q) => q.search("title", search).eq("organizationId", organizationId)
				)
				.paginate(paginationOpts);
		}

		if (search) {
			return await ctx.db.query("documents")
				.withSearchIndex(
					"search_title", 
					(q) => q.search("title", search).eq("ownerId", user.subject)
				)
				.paginate(paginationOpts);
	
		}

		if (organizationId) {
			return await ctx.db
				.query("documents")
				.withIndex("by_organization_id", (q) => q.eq("organizationId", organizationId))
				.paginate(paginationOpts);
		}

		return await ctx.db
			.query("documents")
			.withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
			.paginate(paginationOpts);
	},
});

export const deleteDocumentByID = mutation({
	args: { id: v.id("documents") },
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();

		if (!user) {
			throw new ConvexError("Unauthorized");
		}

		const document = await ctx.db.get(args.id);

		if (!document) {
			throw new ConvexError("Document not found");
		}
		const organizationId = (user.organization_id ?? undefined) as string | undefined;

		const isOwner = document.ownerId === user.subject;
		const isOrganizationMember = !!(document.organizationId && organizationId === document.organizationId);


		if (!isOwner && !isOrganizationMember) {
			throw new ConvexError("Unauthorized");
		}

		await ctx.db.delete(args.id);
	},
});

export const updateDocumentByID = mutation({
	args: { id: v.id("documents"), title: v.string() },
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();

		if (!user) {
			throw new ConvexError("Unauthorized");
		}

		const document = await ctx.db.get(args.id);

		if (!document) {
			throw new ConvexError("Document not found");
		}

		const organizationId = (user.organization_id ?? undefined) as string | undefined;

		const isOwner = document.ownerId === user.subject;
		const isOrganizationMember = !!(document.organizationId && organizationId === document.organizationId);


		if (!isOwner && !isOrganizationMember) {
			throw new ConvexError("Unauthorized");
		}


		await ctx.db.patch(args.id, { title: args.title });
	},
});


export const getDocumentByID = query({
	args: { id: v.id("documents") },
	handler: async (ctx, { id }) => {
		return await ctx.db.get(id);
	},
});