import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CheckoutData {
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  items: CartItem[];
  totalAmount: number;
}

// Generate unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutData = await request.json();
    const { customer, items, totalAmount } = body;

    // Validate required fields
    if (!customer.fullName || !customer.email || !customer.phone) {
      return NextResponse.json(
        { error: "Missing required customer information" },
        { status: 400 },
      );
    }

    if (!customer.address || !customer.city || !customer.country) {
      return NextResponse.json(
        { error: "Missing required shipping address" },
        { status: 400 },
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Generate unique order number
    const orderNumber = generateOrderNumber();

    console.log(`🚀 Starting order creation for ${orderNumber}`);

    // Create order with items in a transaction
    const order = await db.$transaction(async (tx) => {
      // Create the order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerName: customer.fullName,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          address: customer.address,
          city: customer.city,
          zipCode: customer.zipCode || "",
          country: customer.country,
          subtotal: totalAmount,
          totalAmount: totalAmount,
          items: {
            create: items.map((item) => ({
              productId: item.id,
              productTitle: item.title,
              productImage: item.image,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      // Increment the order count for each product (for popularity ranking)
      for (const item of items) {
        await tx.products.update({
          where: { id: item.id },
          data: {
            order: {
              increment: item.quantity,
            },
          },
        });
      }

      return newOrder;
    });

    // Return success response after emails are sent
    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      orderId: order.id,
      message: "Order placed successfully!",
    });
  } catch (error) {
    console.error("❌ Checkout error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to process order";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Get orders (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get("orderNumber");

    if (orderNumber) {
      // Get specific order
      const order = await db.order.findUnique({
        where: { orderNumber },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      return NextResponse.json(order);
    }

    // Get all orders (for admin)
    const orders = await db.order.findMany({
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}
